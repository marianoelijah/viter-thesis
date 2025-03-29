import { imgPath } from '@/components/helpers/functions-general'
import React from 'react'

const CTA = () => {

  return (
    
    <div bg-gray-200>
      {/* CTA Section */}
        <section className='relative w-full h-[300px] flex flex-col items-center justify-center text-center px-2'>
          <div className='layer absolute'>
            <img src={`${imgPath}/Layer.png`} alt="" className='w-full '/>
          </div>
            <h1 className='text-4xl font-semibold text-black relative border bg-white'>
                Fresh & Organic Vegetables <br/>
               Bringing Local Farmers Right to your Table
            </h1>
            <button className='mt-4 bg-white text-green-600 px-6 rounded-full font-semibold shadow-md hover:bg-gray-200'>
                 Check Now
            </button>
        </section>
    </div>
  )
}

export default CTA
