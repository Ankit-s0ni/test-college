import React from 'react';

function formatCurrency(value: any) {
  if (value == null) return 'N/A';
  if (typeof value === 'number') return `₹${value.toLocaleString()}`;
  return String(value);
}

const SummaryCard = ({ title, value }: { title: string; value: React.ReactNode }) => (
  <div className="flex-1 p-4 border rounded bg-gray-50">
    <div className="text-xs text-gray-500">{title}</div>
    <div className="text-lg font-semibold mt-1">{value}</div>
  </div>
);

const PlacementsSection = ({ placements, placementRecords }: { placements?: any[]; placementRecords?: any[] }) => {
  const hasPlacements = (placements && placements.length > 0) || (placementRecords && placementRecords.length > 0);
  if (!hasPlacements) return null;

  // prefer the latest placements object for summary metrics
  const latest = (placements && placements[0]) || (placementRecords && placementRecords[0]) || {};

  // aggregate top recruiters (dedupe)
  const recruiters = new Set<string>();
  (latest.topRecruiters || []).forEach((r: any) => recruiters.add(String(r)));
  if (placementRecords) {
    placementRecords.forEach((rec: any) => {
      (rec.topRecruiters || []).forEach((r: any) => recruiters.add(String(r)));
    });
  }

  // sector breakdown: try to get the most detailed available
  const sectorObj = (latest.sectorWiseData || latest.sectorWiseBreakdown) || null;

  return (
    <section id="placements" className="space-y-6 p-6 rounded-lg border bg-white">
      <h2 className="text-xl font-semibold">Placements</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard title="Placement %" value={latest.placementPercentage ?? latest.placementRate ?? 'N/A'} />
        <SummaryCard title="Students Placed" value={latest.studentsPlaced ?? latest.placedStudents ?? latest.studentsPlaced ?? 'N/A'} />
        <SummaryCard title="Average Package" value={formatCurrency(latest.averagePackage ?? latest.averagePackageString ?? latest.averagePackageFormatted)} />
        <SummaryCard title="Highest Package" value={formatCurrency(latest.highestPackage ?? latest.highestPlacementPackage ?? latest.highestPackageFormatted)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-3">
          <h3 className="text-md font-medium">Top Recruiters</h3>
          {Array.from(recruiters).length === 0 ? (
            <div className="text-sm text-gray-500">No recruiter data available.</div>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {Array.from(recruiters).map((r) => (
                <li key={r} className="px-3 py-1 bg-white border rounded text-sm">
                  {r}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-md font-medium">Sector Breakdown</h3>
          {sectorObj ? (
            <ul className="text-sm space-y-1">
              {Object.entries(sectorObj).map(([k, v]) => (
                <li key={k} className="flex justify-between">
                  <span className="text-gray-700">{k}</span>
                  <span className="font-medium">{String(v as any)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-gray-500">No sector-wise data available.</div>
          )}
        </div>
      </div>

      {/* Detailed records table */}
      {placementRecords && placementRecords.length > 0 && (
        <div>
          <h3 className="text-md font-medium">Placement Records</h3>
          <div className="overflow-auto border rounded mt-2">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Year</th>
                  <th className="p-2 text-left">Total Students</th>
                  <th className="p-2 text-left">Placed</th>
                  <th className="p-2 text-left">Placement Rate</th>
                  <th className="p-2 text-left">Average Package</th>
                  <th className="p-2 text-left">Median</th>
                  <th className="p-2 text-left">Highest</th>
                  <th className="p-2 text-left">Top Recruiters</th>
                </tr>
              </thead>
              <tbody>
                {placementRecords.map((r) => (
                  <tr key={r.id || r.year} className="border-t">
                    <td className="p-2 align-top">{r.year}</td>
                    <td className="p-2 align-top">{r.totalStudents ?? 'N/A'}</td>
                    <td className="p-2 align-top">{r.placedStudents ?? r.studentsPlaced ?? 'N/A'}</td>
                    <td className="p-2 align-top">{r.placementRate ?? r.placementPercentage ?? 'N/A'}</td>
                    <td className="p-2 align-top">{formatCurrency(r.averagePackage)}</td>
                    <td className="p-2 align-top">{formatCurrency(r.medianPackage)}</td>
                    <td className="p-2 align-top">{formatCurrency(r.highestPackage)}</td>
                    <td className="p-2 align-top">
                      {r.topRecruiters && r.topRecruiters.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {r.topRecruiters.map((t: any) => (
                            <span key={t} className="px-2 py-0.5 bg-white border rounded text-xs">
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default PlacementsSection;
