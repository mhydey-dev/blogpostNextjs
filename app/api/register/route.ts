import { registerSchema, registerSchematype } from "@/lib/schema";
import { z } from "zod";
import connect from "@/shared/database/db.connect";
import { usermodel } from "@/shared/database/model/user.model";

export async function POST(request: Request) {
  try {
    await connect();
    const body = await request.json();
    const result = registerSchema.safeParse(body);
    if (result.success === false) {
      const pretty = z.prettifyError(result.error);
      return Response.json(pretty, { status: 400 });
    }
    const { name, email, password, age } = result.data;
    const newUser = await usermodel.create({
      name,
      email,
      password,
      age: typeof age === "string" ? parseInt(age, 10) : age,
      role: "user",
    });
    return Response.json({
      message: "User registered successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error: any) {
    console.log(error, "errormessage");
    const message =
      error?.code === 11000 ? "Email already registered" : error?.message;
    return Response.json({ message: message ?? "Registration failed" }, { status: 500 });
  }
}