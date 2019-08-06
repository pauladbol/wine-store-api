const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Clients GET testing', () => {

    it('GET all clients', () => {
        chai.request('http://localhost:3000')
            .get('/clients')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.an("array");
            });
    });

    it('GET client with major purchase', () => {
        chai.request('http://localhost:3000')
            .get('/clients/majorpurchase')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.an("object");
            });
    });

    it('GET loyal clients', () => {
        chai.request('http://localhost:3000')
            .get('/clients/loyalty') 
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.an("array");
            });
    });

    it('GET client recommendation', () => {
        let id = 1;

        chai.request('http://localhost:3000')
            .get('/clients/' + id + '/recommend')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.an("object");
            });
    });

})





