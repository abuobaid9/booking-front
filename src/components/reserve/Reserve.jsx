import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { SearchContext } from '../../context/SearchContext'
import useFetch from '../../hooks/useFetch'
import './reserve.css'

const Reserve = ({ setOpen, hotelId }) => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
    const { dates } = useContext(SearchContext);

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime());
        let dates = [];
        while (date <= end) {
            dates.push(new Date(date).getTime())
            date.setDate(date.getDATE() + 1)
        }
        return dates
    }
    console.log(getDatesInRange(dates[0].startDate, dates[0].endDates) + 'he');
    // console.log(data + "aaaaaffff");
    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked ? (
                [...selectedRooms, value]
            ) : (
                selectedRooms.filter(item => item !== value
                )
            ))
    }
    // console.log(selectedRooms);
    const handleClick = () => {

    }
    return (
        <div className='reserve' >
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={() => setOpen(false)} />
                {/* onClick={setOpen(false)} */}
                <span> Select Your Room</span>
                {data.map(item => (
                    <div className='rItem' key={item._id}>
                        <div className='rItemInfo'>
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">Max People :<b>{item.maxPeople}</b> </div>
                            <div className="rPrice"><b>${item.price}</b> </div>
                        </div>
                        {item.roomNumber.map((roomNumber, i) => (
                            <div className="room" key={i}>
                                <label>{roomNumber.number}</label>
                                <input type='checkbox' value={roomNumber._id} onChange={handleSelect} />
                            </div>

                        ))}

                    </div>
                ))}
                <button className='rButton' onClick={handleClick} >Reverse Now!</button>
            </div>
        </div>
    )
}

export default Reserve