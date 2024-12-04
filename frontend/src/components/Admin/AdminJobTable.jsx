import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { CREATE_COMPANY_API } from '../utils/constant'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminJobTable = () => {
  const {allAdminJobs , searchJobByText} = useSelector(store=>store.job)
    const navigate = useNavigate();
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);

    useEffect(() => {
        const filterText = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase());
        })
        setFilterJobs(filterText);
    }, [searchJobByText, allAdminJobs])

    return (
        <div>
            <Table className="w-full">
                <TableCaption>A list of your Companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                      filterJobs?.map((job) => (
                            <tr>
                                <TableCell>
                                    {job?.company?.name}
                                </TableCell>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div className='flex items-center gap-2 w-fit cursor-pointer' 
                                            onClick={()=>navigate(`/admin/companies/${job._id}`)}
                                            >
                                                <Edit2 className='w-4' />
                                                <span >Edit</span>
                                            </div>
                                            <div className='flex items-center gap-2 w-fit cursor-pointer' 
                                            onClick={()=>navigate(`/admin/jobs/${job._id}/applicents`)}
                                            >
                                              <Eye className='w-4 mt-2'/>
                                              <span>Applicants</span>

                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                                </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default AdminJobTable
