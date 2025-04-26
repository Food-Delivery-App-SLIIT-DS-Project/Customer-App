'use client';

export default function DeliveryAddress({
  address,
  onChange,
}: {
  address: string;
  onChange: (address: string) => void;
}) {
  return (
    <div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Delivery Address
        </label>
        <textarea
          id="address"
          name="address"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          placeholder="Enter your full address including apartment number, floor, etc."
          value={address}
          onChange={(e) => onChange(e.target.value)}
          required
        />
      </div>
    </div>
  );
}