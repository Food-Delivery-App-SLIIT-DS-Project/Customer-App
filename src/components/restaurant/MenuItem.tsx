import Image from 'next/image';

export default function MenuItem({
  item,
  children,
}: {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
  };
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-start p-4 border-b border-gray-100">
      <div className="flex-1">
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
        <p className="text-green-600 font-medium mt-2">${item.price.toFixed(2)}</p>
      </div>
      
      {item.image && (
        <div className="relative ml-4 w-20 h-20 rounded-md overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="ml-4">
        {children}
      </div>
    </div>
  );
}