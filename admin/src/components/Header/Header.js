import { Button } from '@mui/material';
import React, { useContext } from 'react'
import { MdOutlineMenuOpen } from "react-icons/md";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { FaRegBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { dataContext } from '../../App';
import { Link } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));
 
function Header() {
  let { SetisSidebaropen, isSidebaropen } = useContext(dataContext)

  return (
    <header
      className={`
        w-full
        bg-white
        py-2
        px-4
        md:pr-10
        flex
        justify-between
        items-center
        shadow-md
        transition-all
        duration-300
        ${isSidebaropen ? 'md:pl-[18%]' : 'md:pl-[8%]'}
      `}
    >

      <div className='part1 border-l border-slate-200'>
        <Button className='!min-w-10 !h-10 !rounded-full'>
          <MdOutlineMenuOpen
            className='!text-2xl md:!text-3xl !text-black'
            onClick={() => SetisSidebaropen(!isSidebaropen)}
          />
        </Button>
      </div>

      <div className='part2 flex items-center gap-4 md:gap-5'>
        <div>
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={4} color="secondary">
              <FaRegBell className='!text-black text-lg md:text-xl' />
            </StyledBadge>
          </IconButton>
        </div>

        <Link>
          <Button className='!min-w-10 !h-10 !rounded-full'>
            <FaRegUser className='!text-xl md:!text-2xl !text-black' />
          </Button>
        </Link>
      </div>

    </header>
  )
}

export default Header