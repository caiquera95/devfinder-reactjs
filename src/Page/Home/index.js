import React, { useCallback, useEffect, useState } from 'react';

import './home.css';

import api from '../../services/api';

import {RiSearchLine, RiTwitterFill} from 'react-icons/ri';
import {ImLink, ImGithub} from 'react-icons/im';
import {MdLocationOn} from 'react-icons/md';

import {toast} from 'react-toastify';

import moment from 'moment';


export default function Home() {
    const [users, setUsers] = useState([]);
    const [userInput, setUserInput] = useState('');

    const initApi = "users/octocat";

    useEffect (() => {
        api.get(`${initApi}`)
        .then((response) => {
            console.log(response.data)
            setUsers(response.data)
        })

        .catch((err) => {
            console.log("Não funcionou" + err)
            // alert('Ops, deu erro!!!')
        })
    }, []);

     const handleSubmit = useCallback((e) => {

     e.preventDefault();

     async function submit() {
         const search = await api.get(`users/${userInput}`)
        .then((response) => {
            console.log(response.data);
            setUsers(response.data);
            setUserInput('');
        })

        .catch((err) => {
            console.log("Não funcionou" + err)
            // alert('Dev não encontrado')
            setUserInput('');

            toast.info('Dev não encontrado!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                width: "100px",
                });
        })
     }
    
     submit();
 })


 return (
   <div className='container '>
        <h2>Dev Finder</h2>

        <div className='squad'>

            <form typeof='submit' onSubmit={handleSubmit}>
                <div className='form_input'>
                    <RiSearchLine />
                    <input placeholder='Search GitHub username...' value={userInput} 
                    onChange={(e) => setUserInput(e.target.value)} />
                </div>
            
                <div className='btn'>
                    <button>Search</button>
                </div>
            </form>

                <div className='box'>
                    <div className='img_profile'>
                        <img src={users.avatar_url}/>
                    </div>

                    <div className='box_texts'>

                        <div className='squad_texts'>
                            <div className='texts'>
                                <h2>{users.name}</h2>

                                <div className='username'>
                                    <span>{`@${users.login}`}</span>
                                </div>
                            </div>

                            <div className='text_date'>
                                <p>Ingressou {moment(users.created_at).format('DD/MM/YYYY')}</p>
                            </div>
                        </div>

                            <div className='text_bio'>
                                <p className='text_bio'>
                                    {users.bio ===  null ?  `This profile has no Bio` : `${users.bio}`}
                                </p>
                            </div>

                                <div className='infos_repos'>
                                    <div className='infos_text'>
                                        <a href={`https://github.com/${users.login}?tab=repositories`}
                                        target="_blank" rel="noreferrer"
                                        >Repos</a>
                                        <strong className='repos'>{users.public_repos}</strong>
                                    </div>

                                    <div className='infos_text'>
                                        <p>Followers</p>
                                        <strong>{users.followers}</strong>
                                    </div>

                                    <div className='infos_text'>
                                        <p>Following</p>
                                        <strong>{users.following}</strong>
                                    </div>

                                </div>

                                <div className='box_user'>
                                    <div className='infos_user'>
                                        <p><MdLocationOn /> {users.location}</p>
                                        <p><RiTwitterFill /> {users.twitter_username === null ? `Not Available` : `${users.twitter_username}`}</p>
                                        <a><ImLink /> {users.blog === "" ? `Not Available` : `${users.blog}`}</a>
                                        <p><ImGithub /> {users.login === "" ? `Not Available` : `@${users.login}`}</p>
                                    </div>
                                </div>

                    </div>
                </div>
        </div>
   </div>
 );
}