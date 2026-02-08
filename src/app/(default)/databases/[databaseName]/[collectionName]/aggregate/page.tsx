import { PageParamsWithCollection } from '@/lib/types';
import { runAggregation } from '@/lib/mongodb';
import { AggregationPipeline } from '@/components/aggregation-pipeline';
import { EJSON } from 'bson';

export default async function Page({ params }: PageParamsWithCollection) {
  const { collectionName, databaseName } = await params;

  const runSerializedAggregation = async (
    dbName: string,
    collName: string,
    pipeline: object[],
  ) => {
    'use server';
    const results = await runAggregation(dbName, collName, pipeline);
    return results.map((doc) => EJSON.serialize(doc));
  };

  return (
    <div className='p-6 space-y-6'>
      <div className='space-y-0.5'>
        <h2 className='text-2xl font-bold tracking-tight'>Aggregation Pipeline</h2>
        <p className='text-muted-foreground'>
          Build and run aggregation pipelines on {collectionName} in {databaseName}
        </p>
      </div>

      <AggregationPipeline
        databaseName={databaseName}
        collectionName={collectionName}
        runAggregation={runSerializedAggregation}
      />
    </div>
  );
}

export const dynamic = 'force-dynamic';
