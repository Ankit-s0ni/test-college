import React from 'react';

export interface FeesData {
  title: string;
  description: string;
  fees: Array<{
    courseType: string;
    category: string;
    tuitionFee: number;
    otherFees: number;
    hostelFee?: number;
    messFee?: number;
    transportFee?: number;
    totalFee: number;
    frequency: string;
  }>;
}

const FeesSection = ({ data }: { data: FeesData }) => {
  return (
    <section id="fees" className="space-y-4 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold">{data.title}</h2>
      <p className="text-sm text-muted-foreground">{data.description}</p>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {data.fees.map((fee, idx) => (
          <div key={idx} className="border border-border rounded-md overflow-hidden bg-white">
            <div className="bg-[#1E4BFF] text-white px-3 py-2 text-sm font-medium">
              {fee.courseType} - {fee.category}
            </div>
            <div className="p-3 text-sm space-y-2">
              <div className="flex items-start justify-between gap-3">
                <span className="text-muted-foreground">Tuition Fee</span>
                <span className="font-medium text-right">₹{fee.tuitionFee.toLocaleString()}</span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-muted-foreground">Other Fees</span>
                <span className="text-right">₹{fee.otherFees.toLocaleString()}</span>
              </div>
              {fee.hostelFee && (
                <div className="flex items-start justify-between gap-3">
                  <span className="text-muted-foreground">Hostel Fee</span>
                  <span className="text-right">₹{fee.hostelFee.toLocaleString()}</span>
                </div>
              )}
              {fee.messFee && (
                <div className="flex items-start justify-between gap-3">
                  <span className="text-muted-foreground">Mess Fee</span>
                  <span className="text-right">₹{fee.messFee.toLocaleString()}</span>
                </div>
              )}
              {fee.transportFee && (
                <div className="flex items-start justify-between gap-3">
                  <span className="text-muted-foreground">Transport Fee</span>
                  <span className="text-right">₹{fee.transportFee.toLocaleString()}</span>
                </div>
              )}
              <div className="flex items-start justify-between gap-3 border-t pt-2">
                <span className="text-muted-foreground font-medium">Total Fee</span>
                <span className="text-right font-semibold text-lg">₹{fee.totalFee.toLocaleString()}</span>
              </div>
              <div className="text-center text-xs text-muted-foreground">
                {fee.frequency}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto border border-border rounded-md">
        <table className="min-w-full w-full text-sm">
          <thead>
            <tr className="bg-[#1E4BFF] text-white">
              <th className="px-3 py-2 text-left font-medium">Course Type</th>
              <th className="px-3 py-2 text-left font-medium">Category</th>
              <th className="px-3 py-2 text-left font-medium">Tuition Fee</th>
              <th className="px-3 py-2 text-left font-medium">Other Fees</th>
              <th className="px-3 py-2 text-left font-medium">Hostel Fee</th>
              <th className="px-3 py-2 text-left font-medium">Mess Fee</th>
              <th className="px-3 py-2 text-left font-medium">Total Fee</th>
              <th className="px-3 py-2 text-left font-medium">Frequency</th>
            </tr>
          </thead>
          <tbody className="[&>tr:not(:last-child)]:border-b [&>tr:not(:last-child)]:border-border bg-white">
            {data.fees.map((fee, idx) => (
              <tr key={idx}>
                <td className="px-3 py-2 font-medium">{fee.courseType}</td>
                <td className="px-3 py-2">{fee.category}</td>
                <td className="px-3 py-2">₹{fee.tuitionFee.toLocaleString()}</td>
                <td className="px-3 py-2">₹{fee.otherFees.toLocaleString()}</td>
                <td className="px-3 py-2">
                  {fee.hostelFee ? `₹${fee.hostelFee.toLocaleString()}` : 'N/A'}
                </td>
                <td className="px-3 py-2">
                  {fee.messFee ? `₹${fee.messFee.toLocaleString()}` : 'N/A'}
                </td>
                <td className="px-3 py-2 font-semibold">₹{fee.totalFee.toLocaleString()}</td>
                <td className="px-3 py-2 text-xs">{fee.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground mt-2">
        * Fees are subject to change. Please contact our counselors for the most up-to-date fee structure.
      </p>
    </section>
  );
};

export default FeesSection;
