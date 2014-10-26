/** @jsx React.DOM */
(function(){
  var Grid = React.createClass({
    getInitialState: function(){
      var recordHeight = 25;

      return {
        recordHeight: recordHeight,
        posY: 0,
        filteredRecordList: this.props.recordList
      };
    },
    onScroll: function(){
      this.setState({
        posY: this.refs.scrollable.getDOMNode().scrollTop
      });
    },
    onSearchChange: function(c){
      var filteredRecordList = this.props.recordList.filter(function(item){
        return ((c.id == null || item.id == c.id)
          && (c.firstName == null || item.firstName.toLowerCase().indexOf(c.firstName.toLowerCase()) != -1)
          && (c.lastName == null || item.lastName.toLowerCase().indexOf(c.lastName.toLowerCase()) != -1)
          && (c.country == null || item.country.toLowerCase().indexOf(c.country.toLowerCase()) != -1)
          && (c.color == null || item.color.toLowerCase().indexOf(c.color.toLowerCase()) != -1)
          );
      });

      this.setState({
        filteredRecordList: filteredRecordList
      });
    },
    render: function() {
      return (
        <div>
          <GridToolbar onSearchChange={this.onSearchChange}/>
          <div style={{height:this.props.height + 'px', overflow:'auto'}}  ref="scrollable" onScroll={this.onScroll}>
            <GridBody
              recordList={this.state.filteredRecordList}
              recordHeight={this.state.recordHeight}
              posY={this.state.posY}
              height={this.props.height} />
          </div>
       </div>
      );
    }
  });

  var GridToolbar = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function(){
      return {
        id: null,
        firstName: null,
        lastName: null,
        country: null,
        color: null
      };
    },
    onClick: function(){
      if(this.props.onSearchChange){
        this.props.onSearchChange(this.state);
      }
    },
    render: function() {
      return (
        <div>
          <table className="scroll-table">
            <thead>
              <tr>
                <td>Id</td>
                <td>First name</td>
                <td>Last name</td>
                <td>Country</td>
                <td>Color</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="text" valueLink={this.linkState('id')} /></td>
                <td><input type="text" valueLink={this.linkState('firstName')} /></td>
                <td><input type="text" valueLink={this.linkState('lastName')} /></td>
                <td><input type="text" valueLink={this.linkState('country')} /></td>
                <td><input type="text" valueLink={this.linkState('color')} /></td>
                <td><input type="button" value="filter" onClick={this.onClick} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  });

  var GridBody = React.createClass({
    handleMessageChange: function(event) {
      this.setState({message: event.target.value});
    },
    render: function() {
      var itemHeight = this.props.recordHeight;
      var start = this.props.posY / itemHeight;
      var end = start + (this.props.height / itemHeight);

      var recordList = (this.props.recordList || [])
        .slice(start, end)
        .map(function(item, index){
          return (<tr style={{height:itemHeight + 'px'}}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.country}</td>
              <td>{item.color}</td>
            </tr>);
        });

      var scrollableDivStyle = {
        height: (this.props.recordList.length * itemHeight) + 'px'
      };
      var displayTableStyle = {
        position: 'relative',
        top: this.props.posY + 'px',
        borderSpacing: '0'
      };

      return (
        <div style={scrollableDivStyle}>
          <table style={displayTableStyle} className="scroll-table">
            <tbody>
              {recordList}
            </tbody>
          </table>
        </div>
      );
    }
  });

  var items = generateRecordList(1000000);
  /*
  var ulItemList = ['<ul>'];
  items.forEach(function(e) {
    ulItemList.push('<li>' + e.id + e.firstName + e.lastName + e.country +  e.color + '</li>');
  });
  ulItemList.push('</ul>')
  document.getElementById('react').innerHTML = ulItemList.join('');
  /*/
  React.renderComponent(
    <Grid height="500" recordList={items}/>,
    document.getElementById('react')
  );
  //*/

  function generateRecordList(count){
    var firstNameList = ['Jose','Ruth','Howard','Laura','Stephen','Amy','Rose','Christina','Betty','Clarence','Helen','Charles','Sarah','Marilyn','Willie','Stephanie','Ann','Nicole','Andrew','Louise','Carol','Gregory','Douglas','Philip','Susan','Janice','Joyce','Jesse','Eugene','Aaron','Samuel','Donald','Jeffrey','Shirley','Walter','Victor','Joe','Anthony','Teresa','Janet','Annie','James','Margaret','Nicholas','Brian','Christopher','Frances','Donna','Terry','Bruce','Catherine','Lawrence','Doris','Lillian','John','Matthew','Shawn','Joan','Elizabeth','Edward','Brandon','Jane','Randy','Steve','Kevin','Adam','Jerry','Katherine','Sara','Sean','Pamela','Robin','Kelly','Mary','William','Peter','Jennifer','Heather','Christine','Kathryn','Billy','Evelyn','Theresa','Beverly','Andrea','Norma','Juan','Ruby','Raymond','Bonnie','Jean','Anna','Gloria','David','Virginia','Martin','Barbara','Judith','Deborah','Robert','Brenda','Eric','Arthur','Alan','Melissa','Ralph','Debra','Bobby','Cheryl','Johnny','Michael','Marie','Angela','Wanda','Emily','Nancy','Louis','Todd','Dennis','Fred','Michelle','Rebecca','Steven','Craig','Harold','Frank','Lisa','Daniel','Judy','Carlos','Ronald','Patricia','Scott','Justin','Jeremy','Jacqueline','Diana','Chris','Sharon','Kenneth','Irene','Denise','Sandra','Lois','Earl','Rachel','Kathleen','Phyllis','Martha','Kathy','Keith','Henry','Russell','Linda','Jonathan','Dorothy','Anne','Maria','Amanda','Ashley','Kimberly','Ernest','Roy','Jimmy','Tina','Joseph','Gerald','Richard','Mildred','Tammy','Carolyn','Karen','Joshua','Antonio','Mark','Paula','Ryan','Paul','Jessica','Lori','Thomas','Phillip','George','Julia','Harry','Wayne','Gary','Cynthia','Alice','Diane','Carl','Julie','Jason','Timothy','Benjamin','Larry','Patrick','Roger','Albert','Jack'];
    var lastNameList = ['Ross','Dean','Ford','Ward','Cox','Ryan','Lewis','Long','Howard','Hart','Ray','Hall','Sims','Carr','Palmer','Burke','Weaver','West','Hughes','Murray','Montgomery','Garcia','Ellis','Garrett','Fowler','Hill','Taylor','Hunt','Hernandez','Moreno','Patterson','Little','Fox','Warren','Franklin','Stanley','Powell','Mason','Romero','Hunter','Perry','Brown','Anderson','Tucker','Henry','Richardson','Snyder','Duncan','Peterson','Cooper','Simpson','Nguyen','Chapman','Richards','Frazier','Mitchell','Dixon','Butler','Austin','Carter','Smith','Fisher','Kennedy','Riley','Berry','Gray','James','Lawson','Stephens','Henderson','Fernandez','Collins','Bennett','Williams','Coleman','Castillo','Peters','Burton','Gardner','Adams','Elliott','Harper','Burns','Robinson','Gonzalez','Hamilton','Cunningham','Murphy','Pierce','Alexander','Cook','Hansen','Walker','Bailey','Jackson','Nelson','Porter','Robertson','Ruiz','Welch','Boyd','Martin','Parker','Bryant','Carpenter','Kim','Ortiz','Green','Wright','Chavez','Phillips','White','Kelley','Flores','Rose','Owens','Meyer','Carroll','Alvarez','Brooks','Gutierrez','Grant','Johnston','Andrews','Olson','Roberts','Harrison','Miller','Washington','Lee','Gilbert','Foster','Ramirez','Price','Reid','Martinez','Willis','Hanson','Kelly','Greene','Spencer','Scott','Stone','Larson','Evans','Hicks','Perkins','Rivera','Hawkins','Dunn','Nichols','Wood','Daniels','Arnold','Clark','Baker','Thomas','Lynch','Sanchez','Black','Diaz','Banks','Reyes','Crawford','Ferguson','Graham','Gibson','Howell','Perez','Webb','Woods','Reynolds','Morrison','Hayes','Griffin','Jacobs','Moore','Young','Torres','Sanders','Jenkins','Bell','Barnes','George','Gonzales','Wilson','Jordan','Thompson','Bishop','Davis','Morales','Reed','Simmons','Wells','Freeman','Lopez','Fields','Garza','Knight','Campbell','Armstrong','Gordon','Matthews','Medina','Watson','Bowman','Mcdonald','Rodriguez','Watkins','King','Fuller','Turner','Johnson','Mills','Jones','Gomez','Harvey','Morris','Cole','Rogers','Williamson','Mccoy','Ramos','Morgan','Cruz','Harris','Stewart','Shaw','Oliver','Mendoza','Lane','Schmidt','Marshall','Rice','Wallace','Russell','Stevens','Payne','Wagner','Holmes','Wheeler','Hudson','Day','Edwards','Vasquez','Allen','Bradley','Lawrence','Myers','Sullivan'];
    var countryList = ['Thailand','Iran','Botswana','Jamaica','Estonia','Myanmar','Barbados','Kiribati','Italy','Puerto Rico','Antarctica','United Arab Emirates','Vatican City State (Holy See)','Costa Rica','Papua New Guinea','Cambodia','Mauritius','South Georgia and the South Sandwich Islands','Central African Republic','Turkey','Algeria','Burkina Faso','Switzerland','Qatar','Greece','Saint Barthelemy','Samoa','Cameroon','Г…land','Yugoslavia','Montserrat','Israel','Madagascar','Palestinian Territory, Occupied','Brazil','Senegal','Saint Helena','Gibraltar','Montenegro','Wallis and Futuna Islands','Hungary','Uruguay','Martinique','Bulgaria','Equatorial Guinea','Falkland Islands (Malvinas)','Heard and McDonald Islands','Norway','Timor-Leste','Swaziland','Tuvalu','Netherlands','Libya','Belarus','Namibia','Mayotte','Uzbekistan','Guadeloupe','Liberia','Mozambique','Serbia','Netherlands Antilles','Armenia','Antigua and Barbuda','Marshall Islands','American Samoa','French Guiana','Palau','Kyrgyzstan','Saudia Arabia','Hong Kong','Cyprus','Slovakia','Kazakhstan','Russia','Cape Verde','Czech Republic','Mongolia','China','Haiti','New Zealand','Tunisia','Mexico','Jordan','Bolivia','Angola','Finland','Bahamas','Bosnia and Herzegovina','France','Micronesia','Iceland','Seychelles','Sweden','Yemen','Ghana','Austria','India','Ireland','Japan','French Southern Territories','Iraq','French Polynesia','Christmas Island','United States Virgin Islands','Reunion','Guyana','Togo','South Africa','Mauritania','Dominican Republic','Cuba','Brunei Darussalam','United States of America','Sao Tome and Principe','Honduras','Australia','Suriname','Bahrain','Tajikistan','Gambia','Slovenia','Latvia','Guinea-Bissau','Guatemala','Dominica','Ethiopia','Argentina','Venezuela','Cocos (Keeling) Island','Aruba','Chad','Trinidad and Tobago','Northern Mariana Islands','Nicaragua','Korea, North','Malaysia','Saint Vincent and the Grenadines','Egypt','Croatia','Jersey','Nigeria','Kenya','Faroe Islands','Tokelau','Comoros','Guernsey','Eritrea','Cote d\'Ivoire','Fiji','Ascension Island','Moldova','Chile','Bhutan','Macedonia','Afghanistan','Bermuda','Guam','US Minor Outlying Islands','Turkmenistan','USSR','Guinea','Congo, Democratic Republic of','Zambia','Georgia','Syria','Andorra','Germany','British Indian Ocean Territory','Canada','El Salvador','Oman','Paraguay','Lesotho','Luxembourg','Pitcairn Island','New Caledonia','Grenada','Bouvet Island','Nauru','Sudan','Colombia','Somalia','Saint Pierre and Miquelon','Pakistan','Portugal','Zimbabwe','United Kingdom','Belize','Denmark','Malta','Congo, Republic of','Azerbaijan','Greenland','Ecuador','Liechtenstein','Nepal','Lebanon','Peru','Albania','Cayman Islands','Sierra Leone','Anguilla','Ukraine','Lithuania','Morocco','Uganda','Solomon Islands','Laos','Monaco','Sri Lanka','Kuwait','Macau','San Marino','Mali','Tonga','Spain','Bangladesh','Niger','Romania','Gabon','Tanzania','Indonesia','Vietnam','Rwanda','Belgium','Malawi','Philippines','Taiwan','Djibouti','Saint Kitts and Nevis','Niue','Saint Martin','Panama','Burundi','Svalbard and Jan Mayen Islands','Korea, South','Norfolk Island','Turks and Caicos Islands','Poland','British Virgin Islands','Singapore','Vanuatu','Cook Islands','Benin','Saint Lucia','Isle of Man','Maldives','Western Sahara'];
    var colorList = ['Turquoise','Pink','Aquamarine','Khaki','Fuscia','Turquoise','Indigo','Goldenrod','Maroon','Green','Blue','Teal','Crimson','Red','Puce','Mauv','Purple','Orange','Violet','Yellow'];
    var items = [];

    for(var i = 0; i < count; i++) {
      items.push({
        id: i,
        firstName: firstNameList[Math.floor(Math.random() * firstNameList.length)],
        lastName: lastNameList[Math.floor(Math.random() * lastNameList.length)],
        country: countryList[Math.floor(Math.random() * countryList.length)],
        color: colorList[Math.floor(Math.random() * colorList.length)]
      });
    }

    return items;
  }
})();