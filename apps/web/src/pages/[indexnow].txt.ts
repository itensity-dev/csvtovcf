import type { APIRoute, GetStaticPaths } from 'astro';
import { INDEXNOW_KEY } from '../config/env';

/** IndexNow key file at /{key}.txt — only emitted when INDEXNOW_KEY is set. */
export const getStaticPaths: GetStaticPaths = () =>
  /^[a-zA-Z0-9-]{8,128}$/.test(INDEXNOW_KEY) ? [{ params: { indexnow: INDEXNOW_KEY } }] : [];

export const GET: APIRoute = () => new Response(INDEXNOW_KEY, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
