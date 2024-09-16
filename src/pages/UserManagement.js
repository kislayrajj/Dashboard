import React, { useEffect, useRef, useState } from "react";
import userManagementData from "../temp/user_management_data.json";
import { ReactComponent as FilterIcon } from "../assets/icons/userManagement/filterIcon.svg";
import { ReactComponent as X_mark } from "../assets/icons/userManagement/xMark.svg";
const UserManagement = () => {
  const itemPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterPopUp, setIsFilterPopUp] = useState(false);
  const filterRef = useRef(null);

  const totalPages = Math.ceil(userManagementData?.length / itemPerPage);

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = userManagementData?.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // function to generate dynamic page buttons
  const renderPageButtons = () => {
    const buttons = [];
    const visiblePages = 5;
    const maxInitialPages = 3;
    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`size-8 lg:size-10 rounded-full border border-gray-200 mx-1 transition-all duration-200 ${
              currentPage === i
                ? "bg-[#108699] text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => handlePageChange(i)}>
            {i}
          </button>
        );
      }
    } else {
      for (let i = 1; i <= maxInitialPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`size-8 lg:size-10 rounded-full border border-gray-200 mx-1 transition-all duration-200 ${
              currentPage === i
                ? "bg-[#108699] text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => handlePageChange(i)}>
            {i}
          </button>
        );
      }

      if (currentPage > maxInitialPages + 1) {
        buttons.push(
          <span key="ellipsis-start" className="mx-1">
            ...
          </span>
        );
      }

      const startPage = Math.max(
        currentPage - Math.floor((visiblePages - maxInitialPages - 1) / 2),
        maxInitialPages + 1
      );
      const endPage = Math.min(
        startPage + visiblePages - maxInitialPages - 1,
        totalPages
      );

      for (let i = startPage; i <= endPage; i++) {
        if (i > maxInitialPages) {
          buttons.push(
            <button
              key={i}
              className={`size-8 lg:size-10 rounded-full border border-gray-200 mx-1 transition-all duration-200 ${
                currentPage === i
                  ? "bg-[#108699] text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handlePageChange(i)}>
              {i}
            </button>
          );
        }
      }

      if (endPage < totalPages) {
        buttons.push(
          <span key="ellipsis-end" className="mx-1">
            ...
          </span>
        );
      }

      // Always show the last page
      if (endPage < totalPages) {
        buttons.push(
          <button
            key={totalPages}
            className={`size-8 lg:size-10 rounded-full border border-gray-200 mx-1 transition-all duration-200 ${
              currentPage === totalPages
                ? "bg-[#108699] text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </button>
        );
      }
    }

    return buttons;
  };

  // hide filter when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        e.target !== filterRef.current &&
        !filterRef.current.contains(e.target)
      ) {
        setIsFilterPopUp(false);
      }
    };
    if (isFilterPopUp) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isFilterPopUp]);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center flex-wrap space-y-4 pr-3">
        <div className="font-medium text-2xl">User Management</div>
        <div className="flex items-center justify-start md:justify-center gap-5  flex-wrap">
          <div className="search relative">
            <input
              type="search"
              className="border-2 border-gray-300 rounded outline-none md:w-44 lg:w-72 xl:w-80 p-2  pr-6"
              placeholder="First Name, Email or Contact Number"
            />
            <i className="fa-solid fa-magnifying-glass absolute top-[20%] text-lg right-[5%] text-gray-300 "></i>
          </div>
          <div ref={filterRef} className="relative">
            <div
              onClick={() => setIsFilterPopUp(!isFilterPopUp)}
              className="border border-gray-700 center gap-2 px-4 py-2 rounded cursor-pointer">
              {" "}
              Filter <FilterIcon />
            </div>
            {isFilterPopUp && (
              <div className="absolute right-0 w-80 lg:h-[700px] p-5 py-8 pb-44 lg:pb-72 rounded bg-white">
                <div className=" flex flex-col gap-6 relative">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-xl">Filters</div>
                    <div
                      onClick={() => setIsFilterPopUp(!isFilterPopUp)}
                      className="cursor-pointer">
                      <X_mark />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-medium">Role</div>
                    <div className="flex flex-col gap-2 text-[#4B4F50]">
                      <div className="flex gap-3">
                        <input id="all" type="checkbox" className="" />
                        <label htmlFor="all">All</label>
                      </div>
                      <div className="flex gap-3">
                        <input id="all" type="checkbox" className="size-" />
                        <label htmlFor="all">Customer Admin</label>
                      </div>
                      <div className="flex gap-3">
                        <input id="all" type="checkbox" className="size-" />
                        <label htmlFor="all">Billing Admin</label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-medium">Status</div>
                    <div className="flex flex-col gap-2 text-[#4B4F50]">
                      <div className="flex gap-3">
                        <input id="all" type="checkbox" className="size-" />
                        <label htmlFor="all">All</label>
                      </div>
                      <div className="flex gap-3">
                        <input id="all" type="checkbox" className="size-" />
                        <label htmlFor="all">Active</label>
                      </div>
                      <div className="flex gap-3">
                        <input id="all" type="checkbox" className="size-" />
                        <label htmlFor="all">Inactive</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-7 right-0 flex justify-evenly w-full px-2 h-10">
                  <button className="w-32 py-1 rounded border border-[#182D40]">
                    Reset
                  </button>
                  <button className="w-32 py-1 rounded border border-[#182D40] bg-[#182D40] text-white">
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className=" bg-[#108699] text-white  px-4 py-2  rounded cursor-pointer">
            Add New User
          </div>
        </div>
      </div>
      <div className=" w-[60vw] lg:w-[70vw] xl:w-[75vw] 2xl:w-[81vw] h-[65vh] lg:h-[73vh] overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 border-t rounded overflow-hidden">
          <thead className="">
            <tr className="bg-[#1E4154] text-white">
              <th className="border border-gray-300 px-4 py-2 text-left min-w-12">
                Action
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left min-w-52">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left min-w-36">
                Profile Picture
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left min-w-32">
                Employee ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left min-w-44">
                First Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left min-w-44">
                Middle Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left min-w-44">
                Last Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left min-w-44">
                Role
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left min-w-40">
                Contact Number
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left min-w-40">
                Creation Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left min-w-40">
                Department
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left min-w-40">
                Designation
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left min-w-28">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((employee, index) => (
              <tr key={index} className="bg-[#F8F8F8]">
                <td className="border border-gray-300 px-4 py-2 ">
                  <div className="center">
                    <i className="fa-solid fa-ellipsis-vertical text-gray-400"></i>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="center">
                    <img
                      // src={employee.profilePicture}
                      src="https://imgs.search.brave.com/VYuyQpQdpJJOjDTCVUgTpKNZ5tOe6av4gk_zs28mT1U/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9kMnFw/MHNpb3RsYTc0Ni5j/bG91ZGZyb250Lm5l/dC9pbWcvaGVhZHNo/b3RzL3N1amFuLmpw/Zw"
                      alt={`${employee.firstName} ${employee.lastName}`}
                      className="w-12 h-12 rounded-full "
                    />
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.employeeId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.firstName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.middleName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.lastName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.role}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.contactNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.creationDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.department}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.designation}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between px-12">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`size-8 lg:size-10 center transition-all duration-200  rounded-full border border-gray-200 ${
              currentPage === 1 ? "opacity-50" : "hover:bg-gray-200"
            }`}>
            <i className="fa-solid fa-chevron-left text-xs "></i>
          </button>
          <div className="">{renderPageButtons()} </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`size-8 lg:size-10 center transition-all duration-200 rounded-full border border-gray-200 ${
              currentPage === totalPages ? "opacity-50" : "hover:bg-gray-200"
            }`}>
            <i className="fa-solid fa-chevron-right text-xs "></i>
          </button>
        </div>
        <div>
          Showing {startIndex}-{endIndex} of {userManagementData?.length} items
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
