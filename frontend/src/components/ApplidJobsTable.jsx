import React from 'react'
import PropTypes from 'prop-types'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { useSelector } from 'react-redux'


const ApplidJobsTable = props => {
    useGetAppliedJobs();
    const {allAppliedJobs} = useSelector(store=>store.job)
    return (
        <div>
            <Table className="w-full">
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                      allAppliedJobs?.map((e) => (
                            <TableRow key={e._id}>
                                <TableCell>{e?.job?.createdAt?.split('T')[0]}</TableCell>
                                <TableCell>{e?.job?.title}</TableCell>
                                <TableCell>{e?.job?.company?.name}</TableCell>
                                <TableCell className="text-right"><Badge key={e._id} className='text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full'>{e?.status}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}



export default ApplidJobsTable
