import React, { PropTypes } from 'react';
import moment from 'moment';
import VoucherInfo from './VoucherInfo';
import EditButton from './EditButton';
import Spacer from './Spacer';
import Currency from './Currency';
import StatusButtons from '../components/StatusButtons';
import LabelWithCopy from './LabelWithCopy';

function updateNotes(id, updateVoucherProperty, event) {
    event.stopPropagation();
    updateVoucherProperty(id, 'notes', event.currentTarget.value);
}

function VouchersListRow({ id, brandName, brandImageUrl, serialNumber, cvv, currency, created, discount, faceValue, askingPrice, seller, isExpanded, notes, expandVoucher, updateVoucherProperty}) {
    const date = moment(new Date(created * 1000)).format('DD/MM/YYYY, H:mm'); // August 6th 2016, 12:50:27 pm);
    return (
        <div className='voucher-list-row' onClick={expandVoucher.bind(this, id)}>
            <VoucherInfo brandName={brandName} serialNumber={serialNumber} cvv={cvv} brandImageUrl={brandImageUrl}/>
            <EditButton id={id} />
            <Spacer width="80px" />
            <Currency amount={faceValue} currency={currency}/>
            <Spacer width="63px" />
            <Currency amount={askingPrice} currency={currency} discount={discount}/>
            <Spacer width="113px" />
            <span className="cell-value">{seller}</span>
            <StatusButtons id={id} updateVoucherProperty={updateVoucherProperty} />
            {isExpanded ?
                <div className="expanded-info">
                    <div className="extra-info">
                        <LabelWithCopy label="Created:" value={date} />
                        <LabelWithCopy label="ID:" value={id} />
                    </div>
                     <textarea name="notes"
                               className="notes-field"
                               onChange={updateNotes.bind(this, id, updateVoucherProperty)}
                               value={notes}/>
                </div> : false
            }
        </div>
    )
}

VouchersListRow.propTypes = {
    id: PropTypes.string.isRequired,
    brandName: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    faceValue: PropTypes.number.isRequired,
    askingPrice: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    serialNumber: PropTypes.number.isRequired,
    cvv: PropTypes.number.isRequired,
    created: PropTypes.number.isRequired,
    seller: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    expandVoucher: PropTypes.func.isRequired,
    updateVoucherProperty: PropTypes.func.isRequired
    //paddingRight: PropTypes.string
};

export default VouchersListRow;