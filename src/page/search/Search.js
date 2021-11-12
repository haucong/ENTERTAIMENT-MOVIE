import React, { useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { createTheme, ThemeProvider, TextField, Button, Tabs, Tab } from '@material-ui/core'
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';

export const Search = () => {
    const [type, setType ] = useState(0);
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState([]);
    const [numOfPage, setNumOfPage] = useState();

    const fetchSearch = async() => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/${
            type ? 'tv' : 'movie'
          }?api_key=${
            process.env.REACT_APP_API_KEY
          }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        )
        setContent(data.results);
        setNumOfPage(data.total_pages);
    }

    useEffect(()=> {
        window.scroll(0,0);
        fetchSearch();
        //eslint-disable-next-line
    },[type, page])

    const darkTheme = createTheme({   
      palette: {
        type: 'dark',
        primary: {
          main: '#fff',
        },
      },
    })
    return (
      <div>
        <ThemeProvider theme={darkTheme}>
          <div style={{ display: 'flex', margin: '15px 0' }}>
            <TextField
              style={{ flex: 1 }}
              className='searchBox'
              label='Search'
              variant='outlined'
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              variant='outlined'
              style={{ marginLeft: 10 }}
              onClick={fetchSearch}
            >
              <SearchIcon style={{ margin: 10 }} />
            </Button>
          </div>

          <Tabs
            value={type}
            indicatorColor='primary'
            textColor='primary'
            onChange={(event, newValue) => {
              setType(newValue)
              setPage(1)
            }}
            style={{ paddingBottom: 5 }}
          >
            <Tab style={{ width: '50%' }} label='Search Movies' />
            <Tab style={{ width: '50%' }} label='Search TV series' />
          </Tabs>
        </ThemeProvider>

        <div className='trending'>
          {content &&
            content.map((c) => (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={type ? "tv" : "movie"}
                vote_average={c.vote_average}
              />
            ))}
          {searchText &&
            !content &&
            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
        </div>
        {numOfPage > 1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPage} />
        )}
      </div>
    )
}
