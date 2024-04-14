'use client'
import {Range} from "react-date-range"
import Calender from "./Calender";
import Button from "../Button";


interface ListingReservationProps{
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit:() => void;
    disabled?: boolean;
    disabledDates: Date[];
}


const ListingReservation:React.FC<ListingReservationProps> = ({price, dateRange, totalPrice, onChangeDate, onSubmit, disabledDates, disabled}) => {
    return (  
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="grid grid-cols-1 md:flex md:flex-rows items-center gap-1 p-4 md:justify-around">
                <div className="text-2xl font-semibold mx-auto">
                    ${price}/ <span className="font-light text-neutral-400">night</span>
                </div>
                <hr/>
                <div className="mx-auto">
                    <Calender value={dateRange} disabledDates={disabledDates} onChange={(value) => onChangeDate(value.selection)}/>
                </div>
                <hr/>
                <div className="md:grid md:grid-cols-1">
                    <Button disabled={disabled} label="Reserve" onClick={onSubmit}/>
                    <span className="mt-[10px]">Total: ${totalPrice}</span>
                </div>
            </div>
        </div>
    );
}
 
export default ListingReservation;