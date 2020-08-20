<div className="update-area">

<div className="translucent"></div>
<div className="update-content">
    <div className="location-map-container">
        <h1 className="current-location-displayer"
         data-testid="newLocationDisplay"
        >
            Current Position:{displayCurrentPosition ?
                (<span> (Longitude: {userCurrentLongitude},
              Latitude: {userCurrentLatitude})
                </span>) : ''}
        </h1>
        <div className="location-map"
            onMouseEnter={(e) => handleMouseHover(e)}
            onMouseLeave={(e) => handleMouseLeaving(e)}
        >
        </div>
    </div>
</div>
</div>