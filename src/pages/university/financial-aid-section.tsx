/* eslint-disable @typescript-eslint/no-explicit-any */
import { FinancialAid } from '@/app/universities/[slug]/page';
import React from 'react';

const FinancialAidSection = ({ data }: { data: FinancialAid }) => {
  return (
    <>
      <section id="financial-aid" className="space-y-4 p-6">
        <h2 className="text-xl font-semibold">{data.title}</h2>
        <p className="text-sm text-muted-foreground">{data.description}</p>

        {/* Scholarship table */}
        <div className="overflow-x-auto border border-border">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#1E4BFF] text-white">
                <th className="px-3 py-2 text-left font-medium">Category</th>
                <th className="px-3 py-2 text-left font-medium">Scholarship Credit</th>
                <th className="px-3 py-2 text-left font-medium">Eligibility/Document</th>
              </tr>
            </thead>
            <tbody className="[&>tr:not(:last-child)]:border-b [&>tr:not(:last-child)]:border-border">
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

        {/* Per-program loan tables */}
        {data.loans.map((loanSection, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-base font-semibold">{loanSection.program}</h3>

            <div className="overflow-x-auto border border-border">
              <table className="min-w-full text-sm">
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
                <tbody className="[&>tr:not(:last-child)]:border-b [&>tr:not(:last-child)]:border-border">
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
          <span className="text-blue-600 underline">collegecosmos</span> experts now for more
          details.
        </p>
      </section>
    </>
  );
};

export default FinancialAidSection;
