import NavBarAdmin from '../../components/NavBarAdmin';
import SideBarAdmin from '../../components/SideBarAdmin';
import AdminPageTransition from '../../components/AdminPageTransition';
import { Icon } from '@iconify/react';

const tableHeaders = ['Name', 'Age', 'Sex', 'Province', 'Classification', 'Details'];

const tableData = [
  { name: 'Vicencio, Erik', age: 22, sex: 'Male', province: 'Laguna', classification: 'Renter' },
  { name: 'Vicencio, Erik', age: 22, sex: 'Male', province: 'Laguna', classification: 'Renter' },
  { name: 'Vicencio, Erik', age: 22, sex: 'Male', province: 'Laguna', classification: 'Renter' },
  { name: 'Vicencio, Erik', age: 22, sex: 'Male', province: 'Laguna', classification: 'Renter' },
  { name: 'Vicencio, Erik', age: 22, sex: 'Male', province: 'Laguna', classification: 'Renter' },
  { name: 'Vicencio, Erik', age: 22, sex: 'Male', province: 'Laguna', classification: 'Renter' },
  { name: 'Vicencio, Erik', age: 22, sex: 'Male', province: 'Laguna', classification: 'Renter' },
  { name: 'Vicencio, Erik', age: 22, sex: 'Male', province: 'Laguna', classification: 'Renter' },
  { name: 'Vicencio, Erik', age: 22, sex: 'Male', province: 'Laguna', classification: 'Renter' },
];

function Reports() {
  return (
    <AdminPageTransition>
      <div className="relative -mx-[calc((100vw-100%)/2)] flex w-screen flex-col min-h-screen">
        <NavBarAdmin />
        <div className="flex flex-1">
          <SideBarAdmin activeItem="reports" />
          <div className="flex-1 bg-white px-10 py-8">
            <h1 className="font-['Outfit'] text-[48px] font-bold text-black">Reports</h1>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)]">
              {/* Section header with search */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-['Poppins'] text-[36px] font-bold text-[#001d18]">Cases</h2>
                <div className="flex h-9 w-75.75 items-center gap-2 rounded-full border border-[#d0d0d0] bg-white px-4">
                  <Icon icon="solar:magnifer-outline" className="h-4 w-4 text-[#7c8db5]" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="flex-1 bg-transparent font-['Poppins'] text-sm text-black outline-none placeholder:text-[#7c8db5]"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-hidden rounded-2xl shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#024338]">
                      {tableHeaders.map((header) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-left font-['Poppins'] text-[20px] font-bold text-white"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, i) => (
                      <tr key={i} className="border-b border-[#f0f0f0]">
                        <td className="px-6 py-3 font-['Poppins'] text-[20px] font-medium text-black">
                          {row.name}
                        </td>
                        <td className="px-6 py-3 font-['Poppins'] text-[20px] font-medium text-black">
                          {row.age}
                        </td>
                        <td className="px-6 py-3 font-['Poppins'] text-[20px] font-medium text-black">
                          {row.sex}
                        </td>
                        <td className="px-6 py-3 font-['Poppins'] text-[20px] font-medium text-black">
                          {row.province}
                        </td>
                        <td className="px-6 py-3 font-['Poppins'] text-[20px] font-medium text-black">
                          {row.classification}
                        </td>
                        <td className="px-6 py-3">
                          <button className="cursor-pointer bg-[#024338] px-6 py-2 font-['Poppins'] text-[20px] font-bold text-white">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminPageTransition>
  );
}

export default Reports;
