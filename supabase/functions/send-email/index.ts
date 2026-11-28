import { handle } from './handler.ts';
Deno.serve((req: Request) => handle(req, (k: string) => Deno.env.get(k)));
