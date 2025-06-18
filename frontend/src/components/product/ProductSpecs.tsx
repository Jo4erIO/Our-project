interface Feature {
  name: string;
  value: string;
}

interface Props {
  features: Feature[];
}

export default function ProductSpecs({ features }: Props) {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">Характеристики</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <span className="font-medium min-w-[140px] text-gray-600">{feature.name}:</span>
            <span className="font-medium">{feature.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}