import React from 'react';
import SortIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const AccordionAndSort = ({ isAccordionOpen, setIsAccordionOpen, setSortKey, setSortOrder, sortKey, sortOrder }) => {
    return (
        <div className="col-12 d-flex justify-content-between align-items-center">

            <div className="accordion-trigger" onClick={() => setIsAccordionOpen(!isAccordionOpen)}>
                {isAccordionOpen ? <ExpandLessIcon style={{ color: 'grey' }} /> : <ExpandMoreIcon style={{ color: 'grey' }} />}
                <span>Brands</span>
            </div>
            
            <div className="d-flex align-items-center mb-2">
                <SortIcon  style={{ color: 'grey' }} />
                <select 
                    className="sort-select form-select" 
                    value={`${sortKey}-${sortOrder}`}
                    onChange={(e) => {
                        const [key, order] = e.target.value.split('-');
                        setSortKey(key);
                        setSortOrder(order);
                    }}
                >
                    <option value="" disabled>Sort...</option>
                    <option value="id-desc">Newest First</option>
                    <option value="id-asc">Oldest First</option>
                    <option value="price-asc">Cheapest First</option>
                    <option value="price-desc">Most Expensive First</option>
                </select>
            </div>
        </div>
    );
};

export default AccordionAndSort;
