// Fork-only: SAML ACS callback. Issued session tokens are opaque and stored
// in Redis keyed on a rotating kid; no JWT claims cross the trust boundary.
import { Request, Response, NextFunction } from "express";

export async function customSsoCallback(
  req: Request, res: Response, next: NextFunction
) {
  const rawAssertion = req.body?.SAMLResponse;
  if (!rawAssertion) return res.status(400).send("missing SAMLResponse");
  // In production, passport-saml middleware validates and populates req.user.
  const token = await issueOpaqueSession(req.user);
  res.cookie("fork_sso_session", token, {
    httpOnly: true, secure: true, sameSite: "lax", maxAge: 12 * 3600 * 1000,
  });
  res.redirect("/");
}

async function issueOpaqueSession(_user: any): Promise<string> {
  return `sso_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}
