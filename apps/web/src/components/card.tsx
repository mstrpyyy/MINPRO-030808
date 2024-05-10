import React from "react"

export const Card = () => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl ">
            <figure><img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhvUAdObRio4jrBycPtHnMZeyd7jtFAJSf7xxCN_nP4_oLrpxpeD78KoDpkMrrceVLldKGyDZpyrDwIC3azr6Wr7RfpdZyisaOI1Bndf3jtKMxs_iXGsTFumJN0OW_HDfiEmVle1mDxxGKG6M0MBKUEdOI3R7_UzxB2FiOJrVph8ZQZXjgrWgiRMBpW8w/w1200-h630-p-k-no-nu/Hammersonic-Lineup.jpg" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    Hammersonic 2024
                    <div className="badge badge-secondary">Concert</div>
                </h2>
                <p>Hammersonic adalah event Musik Metal tahunan yang menampilkan Band Band dalam negri maupun luar negeri.</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Ticket Concert</div>
                    <div className="badge badge-outline">Products</div>
                </div>
            </div>
        </div>


    )

}
