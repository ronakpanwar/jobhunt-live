import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact2, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import ApplidJobsTable from './ApplidJobsTable'
import UpdateProfile from './UpdateProfile'
import { useSelector } from 'react-redux'
const skills = ['Html', 'Css', 'JavaScript', 'React'];
    const isResume = true;

const Profile = () => {
    
    const [open , setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
    <div>
    <Navbar />
    <div className="flex flex-col items-center px-4">
  <div className="w-full max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-xl">
    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <Avatar className="h-20 w-20  md:h-28 md:w-28 rounded-full shadow-md">
          <AvatarImage src={user?.profile?.profileImg || "/default-avatar.jpg"} />
        </Avatar>
        <div>
          <h1 className="font-semibold text-sm  md:text-2xl text-gray-800">{user?.fullname}</h1>
          <p className="text-sm text-gray-600">{user?.profile?.bio}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Button
          onClick={() => setOpen(true)}
          className="rounded-full border border-gray-300 hover:bg-gray-100 focus:outline-none"
          variant="outline"
          size="icon"
        >
          <Pen className="w-5 h-5 text-gray-600" />
        </Button>
      </div>
    </div>

    <div className="mx-4">
      <div className="flex gap-1 md:gap-4 text-sm md:text-xl items-center mx-1 md:mx-4 my-4 text-gray-700">
        <Mail className="w-5 h-5 text-blue-500" />
        <p>{user?.email}</p>
      </div>
      <div className="flex gap-1 text-sm md:gap-4 md:text-xl items-center mx-1 md:mx-4 my-4 text-gray-700">
        <Contact2 className="w-5 h-5 text-blue-500" />
        <p>{user?.phoneNo}</p>
      </div>
    </div>

    <div className="m-4 py-4 border-t border-gray-200">
      <h1 className="font-bold text-xl text-gray-800 mb-4">Skills</h1>
      <div className="flex flex-wrap gap-3">
        {user?.profile?.skills.length !== 0 ? (
          user?.profile?.skills.map((skill, index) => (
            <Badge key={index} className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              {skill}
            </Badge>
          ))
        ) : (
          <span className="text-gray-500">NA</span>
        )}
      </div>
    </div>

    <div className="m-4 py-4 border-t border-gray-200">
      <label className="text-lg font-bold text-gray-800 mb-2">Resume</label>
      {isResume ? (
        <a
          href={user?.profile?.resume}
          className="text-blue-600 pl-4 hover:text-blue-800 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {user?.profile?.resumeOrignalName}
        </a>
      ) : (
        <span className="text-gray-500">NA</span>
      )}
    </div>
  </div>

  <div className="w-full max-w-4xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-lg">
    <h1 className="font-bold text-xl text-gray-800 mb-4">Applied Jobs</h1>
    <ApplidJobsTable />
  </div>
  <UpdateProfile open={open} setOpen={setOpen} />
</div>
</div>
)
}

export default Profile
