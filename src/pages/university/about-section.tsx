import { About } from '@/app/universities/[slug]/page';
import React from 'react';

const AboutSection = ({ data }: { data: About }) => {
  return (
    <section id="about" className="space-y-4">
      <h2 className="text-xl font-semibold">{data.title}</h2>

      <p className="text-sm">{data.description}</p>

      <div className="overflow-x-auto rounded-none border border-black">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#1E4BFF] text-white border-black">
              <th className="px-4 py-4 text-left font-medium">Courses</th>
              <th className="px-4 py-4 text-center font-medium" colSpan={4}>
                Semester Wise
              </th>
              <th className="px-4 py-4 text-center font-medium">Online</th>
            </tr>
            <tr className="bg-muted/50 border-black">
              <th className="px-4 py-4" />
              <th className="px-4 py-4 font-medium" colSpan={2}>
                Per Semester
              </th>
              <th className="px-4 py-4 font-medium" colSpan={2}>
                Total Fees
              </th>
              <th className="px-4 py-4" />
            </tr>
          </thead>
          <tbody className="[&>tr:not(:last-child)]:border-b [&>tr:not(:last-child)]:border-border">
            {data.courses.map((c) => (
              <tr key={c.name} className="border-black">
                <td className="px-4 py-4 border-black">{c.name}</td>
                <td className="px-4 py-4 text-center font-medium border-black" colSpan={2}>
                  {c.perSem}
                </td>
                <td className="px-4 py-4 text-center font-medium border-black" colSpan={2}>
                  {c.total}
                </td>
                <td className="px-4 py-4 text-center border-black">N/A</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
  //   return (
  //     <section id="about" className="space-y-4">
  //       <h2 className="text-xl font-semibold">{data.title}</h2>

  //       <p className="text-sm text-muted-foreground">{data.description}</p>

  //       <div className="overflow-x-auto rounded-md border">
  //         <Table>
  //           <TableHeader>
  //             <TableRow>
  //               <TableHead>Course</TableHead>
  //               <TableHead>Per Sem</TableHead>
  //               <TableHead>Total</TableHead>
  //               <TableHead className="text-right">Mode</TableHead>
  //             </TableRow>
  //           </TableHeader>
  //           <TableBody>
  //             {data.courses.map((c) => (
  //               <TableRow key={c.name}>
  //                 <TableCell className="font-medium">{c.name}</TableCell>
  //                 <TableCell>{c.perSem}</TableCell>
  //                 <TableCell>{c.total}</TableCell>
  //                 <TableCell className="text-right">
  //                   {c.online ? 'Online' : 'On-Campus'}
  //                 </TableCell>
  //               </TableRow>
  //             ))}
  //           </TableBody>
  //         </Table>
  //       </div>
  //     </section>
  //   );
};

export default AboutSection;
