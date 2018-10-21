import React, { Component } from 'react';
import './index.css';
export class Profile extends Component {

  render() {
    return (
      <div class="container">
          <div class="innerwrap">
              <section class="section1 clearfix">
                  <div>
                    <div class="row grid clearfix">
                      <div class="col2 first">
                        <img src="http://images.contactmusic.com/newsimages/david_beckham_1133321.jpg" alt=""/>
                        <h1>david beckham</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                        <span>Follow</span>
                      </div>
                      <div class="col2 last">
                        <div class="grid clearfix">
                          <div class="col3 first">
                            <h1>694</h1>
                            <span>Following</span>
                          </div>
                          <div class="col3"><h1>452</h1>
                          <span>Likes</span></div>
                          <div class="col3 last"><h1>1207</h1>
                          <span>Bookmarks</span></div>
                        </div>
                      </div>
                    </div>
                    <div class="row clearfix">
                      <ul class="row2tab clearfix">
                        <li><i class="fa fa-list-alt"></i> My posts </li>
                        <li><i class="fa fa-heart"></i> My likes </li>
                        <li><i class="fa fa-check"></i> Following </li>
                        <li><i class="fa fa-thumbs-o-up "></i> Suggestions </li>
                      </ul>
                    </div>
                  </div>
		          </section>
              <section class="section2 clearfix">
                <div class="grid">
                  <div class="col3 first">
                    <div class="postcont"><img src="https://shewearshighheels.files.wordpress.com/2013/12/david-beckham.jpg" alt=""/>
                    </div>
                    <div class="profileinfo">
                      <img src="http://images.contactmusic.com/newsimages/david_beckham_1133321.jpg" alt=""/>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy tex</p>
                      <span>Read more <i class="fa fa-angle-right"></i></span>
                    </div>
                  </div>
                  <div class="col3 center">
                    <div class="postcont"><img src="http://www.grazia.fr/var/grazia/storage/images/media/images/mode/2016-01-29-david-beckham-devoile-sa/david-beckham-pour-h-m-2/13241802-1-fre-FR/David-Beckham-pour-H-M-2_w300.jpg" alt=""/>
                    </div>
                    <div class="profileinfo">
                      <img src="http://images.contactmusic.com/newsimages/david_beckham_1133321.jpg" alt=""/>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy tex</p>
                      <span>Read more <i class="fa fa-angle-right"></i></span>
                    </div>
                  </div>
                  <div class="col3 last">
                    <div class="postcont"><img src="http://img.timeinc.net/people/i/2006/startracks/060814/david_beckham.jpg" alt=""/>
                    </div>
                    <div class="profileinfo">
                      <img src="http://images.contactmusic.com/newsimages/david_beckham_1133321.jpg" alt=""/>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy tex</p>
                      <span>Read more <i class="fa fa-angle-right"></i></span>
                    </div>
                  </div>
                </div>
              </section>
          </div>
      </div>
);}}
