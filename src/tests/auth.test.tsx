import { login } from "../api";

describe("auth", () => {
  test("auth login fail", async () => {
    try {
      await login({ username: "", password: "" });
    } catch (e) {
      expect((e as any).message).toBe("Invalid credentials");
    }
  });

  test("auth login successfully", async () => {
    try {
      const res = await login({ username: "kminchelle", password: "0lelplR" });
      expect(res).toHaveAttribute("username");
    } catch (e) {
      expect((e as any).message).not.toBe("Invalid credentials");
    }
  });
});
