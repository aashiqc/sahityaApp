'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';

interface Program {
  id: number;
  name: string;
  // Add other properties if needed
}

const Page = () => {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    // Fetch programs data
    fetch("/api/programs")
      .then((res) => res.json())
      .then((data) => setPrograms(data));
  }, []);

  return (
    <div>
    <div className='flex flex-row space-x-4'>
      <div className='w-1/2 flex flex-col gap-3'>
        <Label htmlFor="name">Name</Label>
        <Input type="text" placeholder="Full Name" />
        <Label htmlFor="enrollment-no">Enrollment No</Label>
        <Input type="text" placeholder="Enrollment No" />
        <Label htmlFor="mobile">Mobile No</Label>
        <Input type="number" placeholder="Mobile No" />
        <Label htmlFor="course">Course & Year</Label>
        <Input type="text" placeholder="Course & Year" />
        <Label htmlFor="hall">Hall Name</Label>
        <Input type="text" placeholder="Hall" />
      </div>
      <div className='w-1/2 ' >
        <label htmlFor="">Programs</label>
        <div className='overflow-y-auto max-h-96'>

        {programs.map((item) => (
          <div key={item.id} className='mb-2 flex items-center'>
            <input type='checkbox' className='form-checkbox h-4 w-4 text-indigo-600' />
            <label>{item.name}</label>
          </div>
        ))}
        </div>
      </div>

      
    </div>
    <Button>Add</Button>
    </div>
  );
};

export default Page;
