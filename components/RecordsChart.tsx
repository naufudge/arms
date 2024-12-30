'use client';

import { useState, useEffect } from "react";
import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Collection, Record } from "@prisma/client";
import { capitalizeFirstLetter } from "@/utils/Helpers";

interface RecordChartProps {
  collections: Collection[];
  recordsData: Record[];
};

type ChartConfigType = {
  [key: string]: {
    label: string;
    color?: string;
  }
}

type ChartDataType = {
  collection: string;
  records: number;
  fill: string;
}

const colors = [
  "#A16AE8",
  "#4120A9",
  "#A1A9FE",
  "#F6D4D2",
]

function createChartConfig(data: Collection[]): ChartConfig {
  return data.reduce((config, collection, index) => {
    config[collection.name.toLowerCase()] = { label: capitalizeFirstLetter(collection.name), color: colors[index] };
    return config;
  }, { records: { label: "Records" } } as ChartConfig);
}

function getFormattedDataset(data: Collection[], records: Record[]) {
  return data.reduce<ChartDataType[]>((result, collection) => {
    const filteredRecords = records.filter((record) => {
      if (record.collectionId === collection.id) return record;
    })

    if (filteredRecords.length != 0) {
      result.push({ collection: collection.name.toLowerCase(), records: filteredRecords.length, fill: `var(--color-${collection.name.toLowerCase()})` })
    }
    return result
  }, [])
}

export function RecordsChart({ collections, recordsData }: RecordChartProps) {
  const [chartConfig, setChartConfig] = useState<ChartConfig>()
  const [dataSet, setDataSet] = useState<ChartDataType[]>()

  useEffect(() => {
    if (!chartConfig) {
      console.log(createChartConfig(collections))
      setChartConfig(createChartConfig(collections))
    }
    if (!dataSet) {
      console.log(getFormattedDataset(collections, recordsData))
      setDataSet(getFormattedDataset(collections, recordsData))
    }
  }, [chartConfig, dataSet])


  return (
    <div className="">
      {chartConfig && dataSet &&

        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-w-[400px]"
        >
          <PieChart>
            <Pie data={dataSet} dataKey="records" />
            <ChartTooltip content={<ChartTooltipContent nameKey="collection" />} />
            <ChartLegend
              content={<ChartLegendContent nameKey="collection" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      }
    </div>
  )
}