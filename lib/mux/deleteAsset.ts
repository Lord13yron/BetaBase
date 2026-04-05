import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

function isMuxError(err: unknown): err is Error & { status: number } {
  return err instanceof Error && "status" in err;
}

export async function deleteMuxAsset(muxAssetId: string): Promise<void> {
  try {
    await mux.video.assets.delete(muxAssetId);
  } catch (err) {
    // 404 means already gone — safe to proceed
    if (!isMuxError(err) || err.status !== 404) {
      throw new Error(`Failed to delete Mux asset: ${muxAssetId}`);
    }
  }
}
