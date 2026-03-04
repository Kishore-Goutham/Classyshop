import React from 'react'


function Footer() {
  return (
    <footer className='pt-6 bg-[#fafafa]'>
        <div className='container mx-auto flex justify-between'>
            <div className='text-center'>
                 <i className="fa-solid fa-truck-fast fa-bounce fa-2xl"></i>
                   <h1 className='mt-2 md:text-xl font-semibold'>Free shipping</h1>
                   <p className='hidden md:flex'>For all orders above $100</p>
            </div>
            <div className='text-center'>
                <i className="fa-solid fa-recycle fa-spin fa-2xl"></i>
                <h1 className='mt-2 md:text-xl font-semibold'>30 days Returns</h1>
                <p className='hidden md:flex'>For an exchange product</p>
            </div>
            <div className='text-center'>
                <i className="fa-solid fa-wallet fa-shake fa-2xl"></i>
                <h1 className='mt-2 md:text-xl font-semibold'>Secured Payments</h1>
                <p className='hidden md:flex'>Payment card acccepted</p>
            </div>
            <div className='text-center'>
                <i className="fa-solid fa-gift fa-beat-fade fa-2xl"></i>
                <h1 className='mt-2 md:text-xl font-semibold'>Special gift</h1>
                <p className='hidden md:flex'>On first product order</p>
            </div>
            <div className='text-center'>
                <i className="fa-solid fa-headset fa-flip fa-2xl"></i>
                <h1 className='mt-2 md:text-xl font-semibold'>Support 24/7</h1>
                <p className='hidden md:flex'>Contact us Anytime</p>
            </div> 
        </div>

       <div className="mt-8 bg-[#f5f0f0] py-10 relative">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">

    {/* Contact Us */}
    <div>
      <h2 className="font-semibold text-lg mb-4">Contact Us</h2>

      <p className="text-gray-600">
        Classyshop - Mega Super Store <br />
        507-Union Trade Centre <br />
        France
      </p>

      <p className="mt-3 text-gray-600">
        sales@yourcompany.com
      </p>

      <p className="mt-3 text-[#ff6f61] font-semibold text-lg">
        (+91) 9876-543-210
      </p>

      <div className="flex items-center gap-3 mt-4">
        <i className="fa-regular fa-comment text-2xl text-[#ff6f61]"></i>
        <div>
          <p className="font-semibold">Online Chat</p>
          <p className="text-gray-600 text-sm">Get Expert Help</p>
        </div>
      </div>
    </div>

    {/* Products */}
    <div>
      <h2 className="font-semibold text-lg mb-4">Products</h2>
      <ul className="space-y-2 text-gray-600">
        <li className="hover:text-black cursor-pointer">Prices Drop</li>
        <li className="hover:text-black cursor-pointer">New Products</li>
        <li className="hover:text-black cursor-pointer">Best Sales</li>
        <li className="hover:text-black cursor-pointer">Contact Us</li>
        <li className="hover:text-black cursor-pointer">Sitemap</li>
        <li className="hover:text-black cursor-pointer">Stores</li>
      </ul>
    </div>

    {/* Our Company */}
    <div>
      <h2 className="font-semibold text-lg mb-4">Our Company</h2>
      <ul className="space-y-2 text-gray-600">
        <li className="hover:text-black cursor-pointer">Delivery</li>
        <li className="hover:text-black cursor-pointer">Legal Notice</li>
        <li className="hover:text-black cursor-pointer">Terms And Conditions Of Use</li>
        <li className="hover:text-black cursor-pointer">About Us</li>
        <li className="hover:text-black cursor-pointer">Secure Payment</li>
        <li className="hover:text-black cursor-pointer">Login</li>
      </ul>
    </div>

    {/* Newsletter */}
    <div>
      <h2 className="font-semibold text-lg mb-4">Subscribe To Newsletter</h2>

      <p className="text-gray-600 mb-4">
        Subscribe to our latest newsletter to get news about special discounts.
      </p>

      <input
        type="email"
        placeholder="Your Email Address"
        className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:border-[#ff6f61]"
      />

      <button className="bg-[#ff6f61] text-white px-6 py-2 rounded font-semibold hover:bg-[#e65c50] transition">
        SUBSCRIBE
      </button>

      <div className="flex items-start gap-2 mt-4">
        <input type="checkbox" className="mt-1" />
        <p className="text-sm text-gray-600">
          I agree to the terms and conditions and the privacy policy
        </p>
      </div>
    </div>

  </div>

  {/* Scroll to top button */}
  <button className="absolute right-6 bottom-6 bg-[#ff6f61] text-white w-10 h-10 flex items-center justify-center rounded shadow hover:bg-[#e65c50]">
    <i className="fa-solid fa-chevron-up"></i>
  </button>

</div>
    </footer>
  )
}

export default Footer