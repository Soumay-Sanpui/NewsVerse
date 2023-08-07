import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=293e7a4040904de8b2303182ada9c2cb&pageSize=5"
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })

    }
    handlePreClick = async () => {
        console.log("Previous Click");
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=293e7a4040904de8b2303182ada9c2cb&page=${this.state.page - 1}&pageSize=5`
        this.setState({ laoding: true })
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }
    handleNextClick = async () => {
        console.log("Next Click");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 5))) {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=293e7a4040904de8b2303182ada9c2cb&page=${this.state.page + 1}&pageSize=5`
            this.setState({ loading: true })
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }
    render() {
        return (
            <div className="container my-3 p-4">
                <h2 className='mt-4'>NewsVerse - Top Headlines</h2>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-outline-dark" onClick={this.handlePreClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 5)} type="button" className="btn btn-outline-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News