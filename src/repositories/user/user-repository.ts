import { UserSelectModel, UserInsertModel } from "@/db/drizzle/schemas/schema";
import { db } from "@/db";
import { users } from "@/db/drizzle/schemas/schema";
import { eq } from "drizzle-orm";

export class UserRepository {
  async findByEmail(email: string): Promise<UserSelectModel | null> {
    const results = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return results[0] || null;
  }

  async findById(id: number): Promise<UserSelectModel | null> {
    const results = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return results[0] || null;
  }

  async create(user: UserInsertModel): Promise<UserSelectModel> {
    const [inserted] = await db.insert(users).values(user).returning();
    return inserted;
  }
}

export const userRepository = new UserRepository();
