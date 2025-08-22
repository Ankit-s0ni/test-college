/* eslint-disable @typescript-eslint/no-explicit-any */
import { FinancialAid } from '@/app/universities/[slug]/page';
import React from 'react';

const FinancialAidSection = ({ data }: { data: FinancialAid }) => {
  return (
    <section id="financial-aid" className="space-y-4 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold">{data.title}</h2>
      <p className="text-sm text-muted-foreground">{data.description}</p>

      {/* Scholarships — Mobile cards */}
      <div className="sm:hidden space-y-3">
        {data.tableData.map((row, idx) => (
          <div key={idx} className="border border-border rounded-md overflow-hidden bg-white">
            <div className="bg-[#1E4BFF] text-white px-3 py-2 text-sm font-medium">
              {row.category}
            </div>
            <div className="p-3 text-sm space-y-2">
              <div className="flex items-start justify-between gap-3">
                <span className="text-muted-foreground">Scholarship Credit</span>
                <span className="font-medium text-right">{row.scholarshipCredit}</span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-muted-foreground">Eligibility / Document</span>
                <span className="text-right break-words">{row.eligibilityDocument}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scholarships — Table (≥ sm) */}
      <div className="hidden sm:block overflow-x-auto border border-border rounded-md">
        <table className="min-w-[680px] w-full text-sm">
          <thead>
            <tr className="bg-[#1E4BFF] text-white">
              <th className="px-3 py-2 text-left font-medium">Category</th>
              <th className="px-3 py-2 text-left font-medium">Scholarship Credit</th>
              <th className="px-3 py-2 text-left font-medium">Eligibility/Document</th>
            </tr>
          </thead>
          <tbody className="[&>tr:not(:last-child)]:border-b [&>tr:not(:last-child)]:border-border bg-white">
            {data.tableData.map((row, idx) => (
              <tr key={idx}>
                <td className="px-3 py-2">{row.category}</td>
                <td className="px-3 py-2">{row.scholarshipCredit}</td>
                <td className="px-3 py-2">{row.eligibilityDocument}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Loans per program */}
      {data.loans.map((loanSection, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-base font-semibold">{loanSection.program}</h3>

          {/* Loans — Mobile cards */}
          <div className="sm:hidden space-y-3">
            {loanSection.options.map((opt: any, i: any) => (
              <div key={i} className="border border-border rounded-md overflow-hidden bg-white">
                <div className="bg-[#1E4BFF] text-white px-3 py-2 text-sm font-medium">
                  {opt.mode}
                </div>
                <div className="p-3 text-sm grid grid-cols-2 gap-x-4 gap-y-2">
                  <span className="text-muted-foreground">Total Fees</span>
                  <span className="text-right font-medium">{opt.total}</span>

                  <span className="text-muted-foreground">Loan Amount</span>
                  <span className="text-right font-medium">{opt.loanAmount}</span>

                  <span className="text-muted-foreground">Interest</span>
                  <span className="text-right">{opt.interest}</span>

                  <span className="text-muted-foreground">Tenure</span>
                  <span className="text-right">{opt.tenure}</span>

                  <span className="text-muted-foreground">Monthly EMI</span>
                  <span className="text-right font-medium">{opt.emi}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Loans — Table (≥ sm) */}
          <div className="hidden sm:block overflow-x-auto border border-border rounded-md">
            <table className="min-w-[760px] w-full text-sm">
              <thead>
                <tr className="bg-[#1E4BFF] text-white">
                  <th className="px-3 py-2 font-medium text-left">Mode</th>
                  <th className="px-3 py-2 font-medium text-left">Total Fees</th>
                  <th className="px-3 py-2 font-medium text-left">Loan Amount</th>
                  <th className="px-3 py-2 font-medium text-left">Interest</th>
                  <th className="px-3 py-2 font-medium text-left">Tenure</th>
                  <th className="px-3 py-2 font-medium text-left">Monthly EMI</th>
                </tr>
              </thead>
              <tbody className="[&>tr:not(:last-child)]:border-b [&>tr:not(:last-child)]:border-border bg-white">
                {loanSection.options.map((opt: any, i: any) => (
                  <tr key={i}>
                    <td className="px-3 py-2">{opt.mode}</td>
                    <td className="px-3 py-2">{opt.total}</td>
                    <td className="px-3 py-2">{opt.loanAmount}</td>
                    <td className="px-3 py-2">{opt.interest}</td>
                    <td className="px-3 py-2">{opt.tenure}</td>
                    <td className="px-3 py-2">{opt.emi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <p className="text-xs text-muted-foreground mt-2">
        Note: EMI options are available for all programs. Talk to{' '}
        <span className="text-blue-600 underline">collegecosmos</span> experts now for more details.
      </p>
    </section>
  );
};

export default FinancialAidSection;
