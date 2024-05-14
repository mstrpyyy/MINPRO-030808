import EventBoxDashboard from '@/components/eventBoxDashboard';
import { MdTableChart } from 'react-icons/md';


export default function Page() {

  return (
    <div className='p-2 xl:p-7 w-full'>
      <div className='flex gap-2 bg-xdark w-full p-4 max-sm:py-2 text-xgreen1 text-3xl max-md:text-2xl max-sm:text-xl items-center rounded-2xl shadow-[0_0_5px_rgba(0,0,0,0.3)]'>
      <MdTableChart className='text-4xl'/>
        <h1 className=''>Event Management</h1>
      </div>

      <EventBoxDashboard />

    </div>
  )
}
