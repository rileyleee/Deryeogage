import React, { useEffect, useRef } from "react";
import { useState } from "react";

function SearchAuto({ setRegion }) {
  const mapRef = useRef(null);
  const inputRef = useRef(null);

  // 추가: 검색된 장소의 정보를 상태로 관리
  const [placeInfo, setPlaceInfo] = useState({
    name: "",
    address: "",
    lat: "",
    lng: "",
  });

  useEffect(() => {
    const googleScript = document.createElement("script");
    const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
    window.document.body.appendChild(googleScript);

    googleScript.addEventListener("load", () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.5546788, lng: 126.9706069 },
        zoom: 13,
      });

      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current
      );

      autocomplete.bindTo("bounds", map);

      autocomplete.setFields([
        "address_components",
        "geometry",
        "icon",
        "name",
      ]);

      const infowindow = new window.google.maps.InfoWindow();

      var marker = new window.google.maps.Marker({
        map: map,
        anchorPoint: new window.google.maps.Point(0, -29),
      });

      autocomplete.addListener("place_changed", function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        let address = "";

        // 위치 정보를 부모 컴포넌트에 전달
        setRegion({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: address,
        });

        // 배열 역순으로 탐색
        for (let i = place.address_components.length - 1; i >= 0; i--) {
          if (place.address_components[i].short_name === "KR" && i - 2 >= 0) {
            address = [
              place.address_components[i - 1].short_name,
              place.address_components[i - 2].short_name,
            ].join(" ");
            break; // KR을 찾았으니 반복문 종료
          }
        }

        setRegion({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: address,
        });

        // 수정: 검색된 장소의 정보를 상태에 저장
        setPlaceInfo({
          name: place.name,
          address: address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });

        infowindow.open(map, marker);
      });
    });
  }, []);

  return (
   <div className="App">
      <div id="map" ref={mapRef} style={{ width: "100%", height: "100%" }} />
      <input
        id="pac-input"
        ref={inputRef}
        type="text"
        placeholder="Enter a location"
      />
      <br />
      {/* 추가: 검색된 장소의 정보를 화면에 출력 */}
      <div id="infowindow-content">
        {/* <strong>장소 이름: </strong><span>{placeInfo.name}</span><br /> */}
        <strong>주소: </strong><span>{placeInfo.address}</span><br />
        {/* <strong>위도: </strong><span>{placeInfo.lat}</span><br />
        <strong>경도: </strong><span>{placeInfo.lng}</span><br /> */}
      </div>
    </div>
  );
}

export default SearchAuto;
