import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
const CountriesTables = () => {
const [search, setSearch] = useState('');
const [countries, setCountries] = useState([]);
const [filteredCountries, setFilteredCountries] = useState([]);

const getCountries = async () => {
    try {
        const response = await axios.get('https://restcountries.com/v2/all');
        setCountries(response.data);
        setFilteredCountries(response.data);
        // console.log(response.data);
    } catch (error) {
        console.log(error)
    }
}

useEffect(()=>{
    getCountries();

},[])
useEffect(()=>{
    const result = countries.filter((contry)=>{
        return contry.name.toLowerCase().match(search.toLowerCase());
    })
    setFilteredCountries(result)
},[search])

const columns = [
    {
    name: "Country Name",
    selector: row => row.name,
    sortable:true,
    },
    {
    name: "Country Native Name",
    selector: row => row.nativeName,
    },
    {
    name: "Country Capital",
    selector: row => row.capital,
    },
    {
    name: "Country Flag",
    selector: row => <img width={50} height={50} src={row.flag} />,
    },
   
] 


  return (
    <DataTable title="Country list"  columns={columns} data={filteredCountries} 
     pagination
     fixedHeader 
     fixedHeaderScrollHeight="450px" 
     selectableRows 
     selectableRowsHighlight
     highlightOnHover
     actions={<button className='btn btn-info'>Export</button>} 
     subHeader
     subHeaderComponent={
        <input type="text" className="form-control" placeholder='Search'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />
     }
     />
     
  )
}

export default CountriesTables