import React from 'react';

const AdmissionsSection = ({ admissions }: { admissions: any }) => {
  if (!admissions) return null;

  return (
    <section id="admissions" className="space-y-4 p-6 rounded-lg border bg-white">
      <h2 className="text-xl font-semibold">Admissions</h2>

      <div className="text-sm space-y-1">
        {admissions.applicationStart && admissions.applicationEnd && (
          <div>
            Application Window: <strong>{admissions.applicationStart}</strong> to <strong>{admissions.applicationEnd}</strong>
          </div>
        )}

        {admissions.examDate && (
          <div>Entrance Test Date: <strong>{admissions.examDate}</strong></div>
        )}

        {admissions.resultDate && (
          <div>Result Date: <strong>{admissions.resultDate}</strong></div>
        )}

        {admissions.selectionProcess && (
          <div>Selection Process: <span className="text-sm text-muted-foreground">{admissions.selectionProcess}</span></div>
        )}

        {admissions.applicationFee !== undefined && (
          <div>Application Fee: <strong>₹{Number(admissions.applicationFee).toLocaleString()}</strong></div>
        )}
      </div>
    </section>
  );
};

export default AdmissionsSection;
