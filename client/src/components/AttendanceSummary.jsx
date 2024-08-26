import React from 'react';

const calculateAttendancePercentage = (item) => {
  const percentage = parseFloat(item.progress);
  return isNaN(percentage) ? 0 : percentage.toFixed(2);
};

const AttendanceSummary = ({ data }) => {
  const attendancePercentage = calculateAttendancePercentage(data);

  return (
    <div className="p-4 lg:m-5 bg-gray-100 rounded-lg border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      <div>
        <h2 className="text-lg font-semibold mb-2 text-gray-800">{data.course}</h2>
        <div className="p-4 bg-gray-200 rounded-lg border border-gray-300">
          <p className="text-gray-700">Attendance: <span className="font-bold text-blue-600">{attendancePercentage}%</span></p>
          <p className="text-gray-600">Lectures Held: <span className="font-semibold">{data.totalLectures}</span></p>
          <p className="text-gray-600">Lectures Attended: <span className="font-semibold">{data.lecturesAttended}</span></p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummary;
