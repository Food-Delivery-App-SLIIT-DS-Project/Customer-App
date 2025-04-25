'use client';

export default function PaymentMethod({
  selectedMethod,
  onChange,
}: {
  selectedMethod: string;
  onChange: (method: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          id="card"
          name="paymentMethod"
          type="radio"
          checked={selectedMethod === 'card'}
          onChange={() => onChange('card')}
          className="h-4 w-4 text-green-600 focus:ring-green-500"
        />
        <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
          Credit/Debit Card
        </label>
      </div>
      
      <div className="flex items-center">
        <input
          id="cash"
          name="paymentMethod"
          type="radio"
          checked={selectedMethod === 'cash'}
          onChange={() => onChange('cash')}
          className="h-4 w-4 text-green-600 focus:ring-green-500"
        />
        <label htmlFor="cash" className="ml-3 block text-sm font-medium text-gray-700">
          Cash on Delivery
        </label>
      </div>
      
      {selectedMethod === 'card' && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}