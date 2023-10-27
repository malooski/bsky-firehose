import { Firehose, getOpsByType } from "./firehose";
import { isCommit } from "./lexicon/types/com/atproto/sync/subscribeRepos";

const firehose = new Firehose();

firehose.onEvent.add(async (evt) => {
  if (!isCommit(evt)) return;
  const ops = await getOpsByType(evt);

  // Log all created posts
  for (const op of ops.posts.creates) {
    console.log(op.record.text);
  }
});

firehose.run();
