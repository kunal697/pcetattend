import React, { useEffect, useState } from 'react';
import AttendanceSummary from './AttendanceSummary';
import { ClipLoader } from 'react-spinners';

function Attendance({ username, password }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [averageAttendance, setAverageAttendance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://pcetattend.onrender.com/api/attendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const processedData = data.map((item) => ({
          ...item,
          progress: parseFloat(item.progress) || 0,
          course: item.course.trim(),
        }));
        setAttendanceData(processedData);

        const total = processedData.reduce((sum, item) => {
          return item.totalLectures > 0 ? sum + parseFloat(item.progress) : sum;
        }, 0);
        const count = processedData.filter(item => item.totalLectures > 0).length;
        setAverageAttendance(count > 0 ? (total / count).toFixed(2) : 0);

        setLoading(false);
        setTimeout(() => {
          }, 5000);
      })
      .catch((error) => {
        console.error('Error fetching attendance data:', error);
        setLoading(false);
      });
  }, [username, password]);

  return (
    <div className="container mx-auto p-4">
      {loading  ? (
        <div className="flex justify-center items-center min-h-screen">
          <ClipLoader color="#4A90E2" size={50} />
        </div>
      ) : (
        <>
         {(
           <div className="flex justify-center mb-6">
           <div className="p-6 lg:m-5 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-400 rounded-lg border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
             <h1 className="text-2xl font-bold text-white text-center">Average Attendance</h1>
             <p className="text-center text-3xl mt-2 text-white font-semibold">{averageAttendance}%</p>
           </div>
         </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {attendanceData.map((item, index) => (
              <AttendanceSummary key={index} data={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Attendance;
