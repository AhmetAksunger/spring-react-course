import React from 'react';

const HoaxListItem = (props) => {
    
    const {content, timeStamp} = props;

    return (
        <div className='card'>
        <form>
            <div class="form-group">
                <textarea class="form-control mt-2 mb-2" value={content}/>
                {timeStamp}
            </div>
        </form>
        </div>
    );
};

export default HoaxListItem;