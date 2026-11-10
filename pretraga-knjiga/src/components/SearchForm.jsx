import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"

function SearchForm({onSearch}) {

    const [query, setQuery] = useState("")
    const [searchType, setSearchType] = useState("title")
    const [language, setLanguage] = useState("")
    

    const handleSubmit = (e) => {
        e.preventDefault()

        onSearch({query, searchType, language})
    }


    return (
        <Form onSubmit={handleSubmit} className="bg-light p-4 rounded-4 shadow-sm mb-4">
            <Row className="g-3">
                <Col md={6}>
                    <Form.Control 
                        type="text" 
                        placeholder="Unesite naziv ili autora..." 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        required
                    />
                </Col>
                <Col md={2}>
                    <Form.Select 
                        value={searchType} 
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        <option value="title">Naslov</option>
                        <option value="author">Autor</option>
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Form.Control 
                        type="text" 
                        placeholder="Jezik (npr. eng, srp)" 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    />
                </Col>
                <Col md={2}>
                    <Button type="submit" variant="primary" className="w-100">
                        Pretraži
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default SearchForm