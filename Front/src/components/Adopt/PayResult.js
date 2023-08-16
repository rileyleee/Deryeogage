import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function PayResult() {
    const location = useLocation();
    const pg_token = location.search.split("=")[1];

    const [params, setParams] = useState({
        cid: "TC0ONETIME",
        tid: window.localStorage.getItem("tid"),
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        pg_token: pg_token,
    });

    useEffect(() => {
        axios({
            url: "/v1/payment/approve",
            method: "POST",
            headers: {
                Authorization: "KakaoAK e7cb853a9537243908236f15e2fce905",
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            params,
        })
        .then((response) => {
            // 결제 승인에 대한 응답 출력
            console.log(response);
        })
        .catch(error => {
            console.error("Payment approval failed:", error);
        });
    }, []); // componentDidMount 역할을 하는 useEffect (빈 dependency 배열)

    return (
        <div>
            <h2>Result page</h2>
        </div>
    );
}

export default PayResult;
