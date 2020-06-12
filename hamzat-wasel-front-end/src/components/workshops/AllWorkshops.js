import React,{ Component} from 'react';
import axios from 'axios';
import config from '../token/token';
import AlertSuccess from '../alert/AlertSuccess';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../categories/Pagination';

class AllWorkshops extends Component {
    constructor(props){
        super(props)
            
        this.state = { 
            workshops: [], 
            alert_message: '',
            // search: '',
            total: '',
            current_page: 1,
            per_page: '',
            last_page: ''
        }
    }

    handleChange = ({target}) =>{
        this.setState({ ...this.state, [target.name]: target.value });
        console.log(target);   
    };

    handleSearch(event) {
        this.setState({ search: event.target.value.substr(0,20) });
    }
        
    componentDidMount (){ 
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.get('http://localhost:8000/api/workshops?page='+this.state.current_page,config).then(res => {
                console.log(res.data.data);
                this.setState({ 
                    workshops: res.data.data,
                    total: res.data.meta.total,
                    current_page: res.data.meta.current_page,
                    per_page: res.data.meta.per_page,
                    last_page: res.data.meta.last_page
                }) 
                    
            }).catch(error => {
                console.log(error.response)
            }); 
        });
    };

    onWorkshopDeleted = workshopId => { 
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.delete('http://localhost:8000/api/workshops/'+ workshopId,config).then(res => {
                console.log(res.data);
			    let workshops = this.state.workshops;
                function removeWorkshop(arr, value) {
                    return arr.filter((workshop)=>{
                    return workshop.id !== value; });
                }
            
                this.setState({workshops:removeWorkshop(workshops,workshopId), alert_message: "success"});     
                setTimeout(() => this.setState({alert_message:''}), 9000);

            }).catch(error => {
                this.setState({alert_message: "error"});
                setTimeout(() => this.setState({alert_message:''}), 9000);
                console.log(error)
            });
        });
    };


render() { 
    const {  per_page, last_page } = this.state;
    const indexOfLastWorkshop = last_page;
    const indexOfFirstWorkshop = indexOfLastWorkshop - per_page;
    this.state.workshops.slice(indexOfFirstWorkshop, indexOfLastWorkshop);

    const paginate = pageNum => {
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.get('http://localhost:8000/api/workshops?page='+(this.state.current_page=pageNum),config).then(res => {
                console.log(res.data);
                this.setState({ 
                    workshops: res.data.data,
                    total: res.data.meta.total,
                    per_page: res.data.meta.per_page,
                    current_page: pageNum,
                })
                    
            }).catch(error => {
                console.log(error.response)
            }); 
        });
    };

    const nextPage = () => { 
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.get('http://localhost:8000/api/workshops?page='+(this.state.current_page+1),config).then(res => {
                console.log(res.data);
                if(!res.data.meta.last_page < this.state.current_page + 1){
                this.setState({ 
                    workshops: res.data.data,
                    total: res.data.meta.total,
                    per_page: res.data.meta.per_page,
                    current_page: this.state.current_page + 1,
                })
            }
                    
            }).catch(error => {
                console.log(error.response)
            }); 
        });
    }
        
    const prevPage = () => {
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.get('http://localhost:8000/api/workshops?page='+(this.state.current_page-1),config).then(res => {
                console.log(res.data);
                this.setState({ 
                    workshops: res.data.data,
                    total: res.data.meta.total,
                    per_page: res.data.meta.per_page,
                    current_page: this.state.current_page - 1 
                })
                    
            }).catch(error => {
                console.log(error.response)
            }); 
        });
    }

    // let workshops = this.state.workshops.filter((workshop) => {
    //     return workshop.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    // });
    
    return ( 
    <div className="container">
        {/* <div className="text-right ml-2">
        <FontAwesomeIcon className="bg-light" icon={faSearch} style={{color:"Blue"}} />  
            <input type="search" className="m-3" placeholder="Search workshop by name"
                style={{width:198}} onChange={this.handleSearch.bind(this)}/>
             
        </div> */}
        {this.state.alert_message === "success" ? <AlertSuccess message=
        {"You deleted this workshop successfully, This record isn't a part of the database anymore"} /> : ""}
        <div className="row mt-3">
            {this.state.workshops.map(workshop => { return (
            <div className="col-md-6 col-xs-4" key={workshop.id}>
                <div className="card border-info mb-3">
                    <div className="bg-transparent border-info">
                        <div className="card-header bg-transparent border-info">          
                            <h5 className="text-info m-3">{workshop.title} 
                                <span className="badge badge-primary float-right"> 
                                    {workshop.category_info.category_name}
                                </span>
                            </h5>  
                        </div>
                        <div className="card-body bg-transparent border-info text-left">  
                            <h5 className="card-text">
                                <span className="badge badge-info mr-1"> 
                                Description
                                </span> 
                                {workshop.description}
                            </h5> 
                            <h5 className="card-text">
                                <span className="badge badge-info mr-1">
                                Number of attendees 
                                </span> 
                                {workshop.capcity}
                            </h5> 
                            <h5 className="card-text">
                                <span className="badge badge-info mr-1">
                                Mentor 
                                </span> 
                                {workshop.mentor_info.name}
                            </h5> 
                            <h5 className="card-text">
                                <span className="badge badge-info mr-1">  
                                price 
                                </span>
                                {workshop.workshop_price} EGP
                            </h5>
                            <button onClick={()=>{ if 
                            (window.confirm('Are you sure you want to delete this workshop?'))
                            this.onWorkshopDeleted(workshop.id)}} 
                            className="btn btn-danger font-weight-bold m-1"> Delete </button>
                            <Link to={`/workshops/edit/${workshop.id}`}>
                                <button className="btn btn-info font-weight-bold m-1">Edit</button>
                            </Link>
                        </div>
                        <div className="card-footer bg-transparent border-info">
                                <small className="text-info m-2">From:  {workshop.start_date}</small>
                                <br />
                                <small className="text-danger m-2">To:  {workshop.end_date}</small>
                        </div>
                    </div>        
                </div>
            </div>
                );
                })
            }    
        </div>
        <div className="mt-3">
        <Pagination per_page={per_page} total={this.state.total} paginate={paginate} 
            nextPage={nextPage} prevPage={prevPage} />        
    </div>
    </div>  
    );
    }
}

 
export default AllWorkshops;