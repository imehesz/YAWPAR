var DefaultController = require("../core/DefaultController.js");

class SearchFormController extends DefaultController {
  riotInit() {
    super.riotInit();
    
    this.rs.btnClick = () => {
      alert("Search Clicked!");
    };
    
    console.log("INIT FROM SearchFormController");
  }
}

module.exports = SearchFormController;