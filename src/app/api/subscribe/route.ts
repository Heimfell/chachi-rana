import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "subscribers.json");

interface Subscriber {
  email: string;
  source: string;
  date: string;
}

async function getSubscribers(): Promise<Subscriber[]> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

const RATE_LIMIT_MAP = new Map<string, number>();
const RATE_LIMIT_MS = 60_000;

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    const lastRequest = RATE_LIMIT_MAP.get(ip);
    if (lastRequest && Date.now() - lastRequest < RATE_LIMIT_MS) {
      return NextResponse.json(
        { error: "Demasiadas peticiones. Espera un momento." },
        { status: 429 }
      );
    }
    RATE_LIMIT_MAP.set(ip, Date.now());

    const body = await request.json();
    const { email, source } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const subscribers = await getSubscribers();

    if (subscribers.some((s) => s.email === normalizedEmail)) {
      return NextResponse.json({ message: "Ya estás suscrito" });
    }

    const newSubscriber: Subscriber = {
      email: normalizedEmail,
      source: source || "unknown",
      date: new Date().toISOString(),
    };

    subscribers.push(newSubscriber);
    await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));

    return NextResponse.json({ message: "Suscrito correctamente" });
  } catch {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}

export async function GET() {
  const subscribers = await getSubscribers();
  return NextResponse.json({ count: subscribers.length });
}
